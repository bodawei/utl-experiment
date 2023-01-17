import React, { ReactElement, useEffect } from "react";

interface HasUseEffectProps {
  value: string;
  onEffectCalled: (value: string) => void;
}

const HasUseEffect = (props: HasUseEffectProps): ReactElement => {
  const { onEffectCalled, value } = props;

  useEffect(() => {
    onEffectCalled(value);
  }, [onEffectCalled, value]);

  return <div>The value is {value}.</div>;
};

export { HasUseEffect };
