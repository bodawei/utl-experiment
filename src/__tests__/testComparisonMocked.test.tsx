import { Utl } from "../Utl";
import { ReactElement } from "react";
import { mount, shallow } from "enzyme";
import { render, fireEvent, screen } from "@testing-library/react";

import { FunctionalComponent } from "../fixtures/FunctionalComponent";
import { SelfModifying } from "../fixtures/SelfModifying";

jest.mock("../fixtures/LeafComponent", () => ({
  LeafComponent: "leaf-component",
}));

describe("compare testing libraries (with mocking)", () => {
  describe("snapshot a simple DOM component", () => {
    it("with Util", () => {
      const u = new Utl(<div>hi</div>);

      expect(u.json).toMatchInlineSnapshot(`
        <div>
          hi
        </div>
      `);
    });

    it("with Enzyme shallow()", () => {
      const wrapper = shallow(<div>hi</div>);

      expect(wrapper).toMatchInlineSnapshot(`
        <div>
          hi
        </div>
      `);
    });

    it("with Enzyme mount()", () => {
      const wrapper = mount(<div>hi</div>);

      expect(wrapper).toMatchInlineSnapshot(`
        <div>
          hi
        </div>
      `);
    });

    it("with TestingLibrary/react", () => {
      render(<div>hi</div>);

      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div><div>hi</div></div>"`
      );
    });
  });

  describe("snapshot a tree of components", () => {
    let testElement: ReactElement;

    beforeEach(() => {
      testElement = (
        <FunctionalComponent name="fred" value={1234}>
          <div>These are children</div>
        </FunctionalComponent>
      );
    });

    it("with Util", () => {
      const u = new Utl(testElement);

      expect(u.json).toMatchInlineSnapshot(`
        <div>
          <leaf-component
            name="fred"
            value={1234}
          />
          <div>
            These are children
          </div>
        </div>
      `);
    });

    it("with Enzyme shallow()", () => {
      const wrapper = shallow(testElement);

      expect(wrapper).toMatchInlineSnapshot(`
        <div>
          <leaf-component
            name="fred"
            value={1234}
          />
          <div>
            These are children
          </div>
        </div>
      `);
    });

    it("with Enzyme mount()", () => {
      const wrapper = mount(testElement);

      expect(wrapper).toMatchInlineSnapshot(`
        <FunctionalComponent
          name="fred"
          value={1234}
        >
          <div>
            <leaf-component
              name="fred"
              value={1234}
            />
            <div>
              These are children
            </div>
          </div>
        </FunctionalComponent>
      `);
    });

    it("with TestingLibrary/react", () => {
      render(testElement);

      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div><div><leaf-component name="fred" value="1234"></leaf-component><div>These are children</div></div></div>"`
      );
    });
  });
  describe("snapshot a component with a useEffect", () => {
    let testElement: ReactElement;

    beforeEach(() => {
      testElement = <SelfModifying value="fred" />;
    });

    it("with Util", () => {
      const u = new Utl(testElement);

      expect(u.json).toMatchInlineSnapshot(`
        <div>
          The value is 
          done
          .
        </div>
      `);
    });

    it("with Enzyme shallow()", () => {
      const wrapper = shallow(testElement);

      expect(wrapper).toMatchInlineSnapshot(`
        <div>
          The value is 
          fred
          .
        </div>
      `);
    });

    it("with Enzyme mount()", () => {
      const wrapper = mount(testElement);

      expect(wrapper).toMatchInlineSnapshot(`
        <SelfModifying
          value="fred"
        >
          <div>
            The value is 
            done
            .
          </div>
        </SelfModifying>
      `);
    });

    it("with TestingLibrary/react", () => {
      render(testElement);

      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div><div>The value is done.</div></div>"`
      );
    });
  });
});
