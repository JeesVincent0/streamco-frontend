type Props = {
  isSubmitting: boolean;
  submittingText: string;
  text: string;
};

const SubmitButton = ({ isSubmitting, submittingText, text }: Props) => {
  return (
    <button
      type="submit"
      className="h-8 border border-white/75 hover:border-white w-[80%] rounded-sm bg-[#FF7701] hover:bg-[#c95e00] font-semibold text-sm hover:text-[15px] hover:cursor-pointer"
    >
      {isSubmitting ? submittingText : text}
    </button>
  );
};

export default SubmitButton;
