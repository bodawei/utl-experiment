import { ReactElement } from "react";

interface LeafComponent {
  name: string;
  value: number;
}

const LeafComponent = (props: LeafComponent): ReactElement => {
  const { name, value } = props;

  return (
    <div>
      <p>
        {name} has the value {value}.
      </p>
    </div>
  );
};

export { LeafComponent };
