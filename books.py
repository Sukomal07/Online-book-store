
import json
from typing import Dict, List, Optional


class Book:
  """
  - Book class to represent books
  """
  json_file_path = "static/json/books.json" 
  _data: Dict[str, List[Dict[str, str]]] = None
  
  @classmethod
  def read_json_file(cls) -> None:
    """
    Reads the books.json file and stores the data in data class attribut
    """
    with open(cls.json_file_path, "r", encoding="utf-8") as f:
      cls._data = json.load(f)
  
  @classmethod
  def get_all_books(cls) -> List[Dict[str, str]]:
    """
    Reads the json file and returns all the books as list of book object
    """
    cls.read_json_file()
    return cls._data["books"]
