import { useState } from "react";
interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const Search = ({
  onSearch,
  placeholder = "Palabra clave, referencia de producto, sku ...",
  initialValue = "",
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    onSearch(inputValue.trim()); 
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="search-input-form"
      style={{ marginBottom: "20px" }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        aria-label="Buscar productos"

        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "100%",
          boxSizing: "border-box",
        }}
      />

    </form>
  );
};
