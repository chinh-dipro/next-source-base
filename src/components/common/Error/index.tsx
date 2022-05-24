interface ErrorProps {
  message: string;
}

export default function Error(props: ErrorProps) {
  return (
    <div className="text-red-700">
      {props.message}
    </div>
  );
}
