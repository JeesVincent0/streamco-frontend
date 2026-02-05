type Props = {
  text: string;
};

const Button = ({ text }: Props) => {
  return (
    <button
      className={`h-8 border border-white/75 hover:border-white w-[80%] rounded-sm bg-[#FF7701] hover:bg-[#c95e00] font-semibold text-sm hover:text-[15px] hover:cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default Button;
