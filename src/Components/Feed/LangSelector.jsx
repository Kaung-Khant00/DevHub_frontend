const languages = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "PHP",
  "Python",
  "Ruby",
  "Java",
  "C#",
  "SQL",
  "Vue",
  "Sass",
  "JSON",
];

const LangSelector = ({ codeLang, setCodeLang }) => {
  return (
    <select
      value={codeLang}
      onChange={(e) => setCodeLang(e.target.value)}
      className="select select-sm select-bordered w-36"
    >
      <option disabled selected>
        Select Language
      </option>
      {languages.map((lang) => (
        <option key={lang} value={lang.toLowerCase()}>
          {lang}
        </option>
      ))}
    </select>
  );
};

export default LangSelector;
