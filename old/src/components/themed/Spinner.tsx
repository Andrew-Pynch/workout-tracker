type SpinnerProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const Spinner = (props: SpinnerProps) => {
  return (
    <div
      className={
        'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-backgroundInvert motion-reduce:animate-[spin_1.5s_linear_infinite] ${props.className}'
      }
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;

