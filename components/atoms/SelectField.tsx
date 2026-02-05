const SelectField = () => {
  return (
    <select
      className="h-10 border border-white/15 w-[80%] rounded-sm p-2 text-sm text-white/30 bg-transparent placeholder:text-white/30"
      defaultValue=""
    >
      <option className="bg-[#1F1F1F]" value="" disabled>
        Gender
      </option>
      <option className="bg-[#2A2A2A]" value="male">
        Male
      </option>
      <option className="bg-[#2A2A2A]" value="female">
        Female
      </option>
      <option className="bg-[#2A2A2A]" value="nonbinary">
        Non-Binary
      </option>
      <option className="bg-[#2A2A2A]" value="preferNot">
        Prefer not to say
      </option>
    </select>
  );
};

export default SelectField;
