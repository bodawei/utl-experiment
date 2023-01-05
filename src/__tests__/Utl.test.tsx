import { Utl } from "../Utl";
import React from "react";
import { HasUseEffect } from "../fixtures/HasUseEffect";

describe("Utl", () => {
  describe('construction', () => {
    it("invokes useEffect() effects before returning", () => {
      let result: string = 'bar';

      new Utl(<HasUseEffect value="foo" onEffectCalled={value => result = value}/>);

      expect(result).toEqual('foo');
    });
  })

  describe('json', () => {
    it("returns a JSON structure for a simple element that can be turned into an HTML-like snapshot", () => {
      const u = new Utl(<div>hi</div>);

      expect(u.json).toMatchInlineSnapshot(`
        <div>
          hi
        </div>
      `);
    });
  })
});
