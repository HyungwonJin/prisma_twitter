interface ButtonProps {
  text: string;
  [key: string]: any;
}

export default function Button({ text, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={
        "w-full bg-blue-400 hover:bg-blue-500 text-white py-1 mb-3 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none"
      }
    >
      {text}
    </button>
  );
}
