from langchain_community.utilities import DuckDuckGoSearchAPIWrapper, WikipediaAPIWrapper
from pydantic import BaseModel, Field

# Define the expected structured output schema (remains same for compatibility)
class ResearchOutput(BaseModel):
    query: str = Field(description="The original user query.")
    summary: str = Field(description="A comprehensive summary of the research findings.")
    key_points: list[str] = Field(description="A list of bullet points detailing the key facts.")
    sources: list[str] = Field(description="A list of sources used (e.g., URLs or Wikipedia article names).")
    research_papers: list[dict] = Field(default=[], description="Links to relevant research papers.")
    books: list[dict] = Field(default=[], description="Recommended books related to the topic.")

def run_research_agent(query: str) -> dict:
    """
    Research logic without LLM.
    Fetches data from Wikipedia, DuckDuckGo, arXiv (papers), and Google Books.
    """
    # 1. Initialize the utilities
    ddg = DuckDuckGoSearchAPIWrapper()
    wiki = WikipediaAPIWrapper()
    
    sources = []
    key_points = []
    summary_parts = []
    research_papers = []
    books = []
    
    # 2. Try Wikipedia first for a high-level summary
    try:
        wiki_content = wiki.run(query)
        if wiki_content and "No good Wikipedia Search Result was found" not in wiki_content:
            summary_parts.append(wiki_content[:600] + "...")
            key_points.append("Overview from Wikipedia")
            sources.append("Wikipedia")
    except Exception:
        pass
        
    # 3. Use DuckDuckGo for general results
    try:
        ddg_results = ddg.results(query, max_results=5)
        for res in ddg_results:
            key_points.append(res['title'])
            sources.append(res['link'])
            if not summary_parts:
                summary_parts.append(res['snippet'])
    except Exception:
        pass

    # 4. Search for Research Papers (e.g., arXiv)
    try:
        paper_results = ddg.results(f"{query} research papers site:arxiv.org", max_results=3)
        for res in paper_results:
            research_papers.append({"title": res['title'].replace(" [PDF]", "").replace("arXiv:", ""), "url": res['link']})
    except Exception:
        pass

    # 5. Search for Books (e.g., Google Books)
    try:
        book_results = ddg.results(f"{query} books site:books.google.com", max_results=3)
        for res in book_results:
            books.append({"title": res['title'].replace(" - Google Books", ""), "url": res['link']})
    except Exception:
        pass
        
    # 6. Construct final summary
    if not summary_parts:
        summary = "No detailed information found for this query."
    else:
        summary = " ".join(summary_parts[:2])
        
    return {
        "query": query,
        "summary": summary,
        "key_points": key_points[:10],
        "sources": list(set(sources)),
        "research_papers": research_papers,
        "books": books
    }
