import { act, create } from 'react-test-renderer';
import { ReactElement } from 'react';
import { ReactTestRenderer } from 'react-test-renderer';

class Utl {
  // @ts-expect-error -- Trust me, it will be initialized in the constructor
  private trWrapper: ReactTestRenderer;

  constructor(element : ReactElement ) {
    act(() => {
      this.trWrapper = create(element);
    });
  }

  public get json() {
    return this.trWrapper.toJSON();
  }

  public get tree() {
    return this.trWrapper.toTree();
  }
}

export { Utl }
