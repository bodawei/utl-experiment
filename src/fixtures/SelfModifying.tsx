import React, { ReactElement, useEffect, useState } from "react";

interface HasUseEffectProps {
  value: string;
}

const SelfModifying = (props: HasUseEffectProps): ReactElement => {
  const { value } = props;
  const [newValue, setValue] = useState(value);

  useEffect(() => {
    setValue("done");
  });

  return <div>The value is {newValue}.</div>;
};

export { SelfModifying };
