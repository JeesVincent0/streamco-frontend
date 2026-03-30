import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  name: string;
  error: string | undefined;
};

const SelectField = ({ register, name, error }: Props) => {
  return (
    <div className="w-[80%]">
      <label className="text-sm text-white/80" htmlFor="">
        Gender
        {error && (
          <span>
            : <span className="text-red-400 text-xs">{error}</span>
          </span>
        )}
      </label>

      <select
        {...register(name)}
        className="mt-1 h-8 border border-white/45 w-full rounded-sm p-2 text-sm text-white/80 bg-transparent placeholder:text-white/30"
        defaultValue=""
      >
        <option className="bg-[#1F1F1F]" value="" disabled></option>
        <option className="bg-[#2A2A2A]" value="MALE">
          Male
        </option>
        <option className="bg-[#2A2A2A]" value="FEMALE">
          Female
        </option>
        <option className="bg-[#2A2A2A]" value="NON_BINARY">
          Non-Binary
        </option>
        <option className="bg-[#2A2A2A]" value="PREFER_NOT_TO_SAY">
          Prefer not to say
        </option>
      </select>
    </div>
  );
};

export default SelectField;
