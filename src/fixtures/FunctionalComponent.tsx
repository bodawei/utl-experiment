import { ReactElement } from "react";
import { LeafComponent } from "./LeafComponent";

interface ReactComponent {
  name: string;
  value: number;
  children: ReactElement;
}

const FunctionalComponent = (props: ReactComponent): ReactElement => {
  const { name, value, children } = props;

  return (
    <div>
      <LeafComponent name={name} value={value} />
      {children}
    </div>
  );
};

export { FunctionalComponent };
