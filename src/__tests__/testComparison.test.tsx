import { Utl } from "../Utl";
import { ReactElement } from "react";
import { mount, shallow } from "enzyme";
import { render, fireEvent, screen } from "@testing-library/react";

import { FunctionalComponent } from "../fixtures/FunctionalComponent";
import { Game } from "../fixtures/game/Game";
import { SelfModifying } from "../fixtures/SelfModifying";

describe("compare testing libraries", () => {
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

      expect(document.body.innerHTML).toEqual("<div><div>hi</div></div>");
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
          <div>
            <p>
              fred
               has the value 
              1234
              .
            </p>
          </div>
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
          <LeafComponent
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
            <LeafComponent
              name="fred"
              value={1234}
            >
              <div>
                <p>
                  fred
                   has the value 
                  1234
                  .
                </p>
              </div>
            </LeafComponent>
            <div>
              These are children
            </div>
          </div>
        </FunctionalComponent>
      `);
    });

    it("with TestingLibrary/react", () => {
      render(testElement);

      expect(document.body.innerHTML).toEqual(
        "<div><div><div><p>fred has the value 1234.</p></div><div>These are children</div></div></div>"
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

      expect(document.body.innerHTML).toEqual(
        "<div><div>The value is done.</div></div>"
      );
    });
  });

  describe("clicking on a cell updates the table", () => {
    let testElement: ReactElement;

    beforeEach(() => {
      testElement = <Game />;
    });

    it("with Util", () => {
      const u = new Utl(testElement);

      const instances = u.findAll("button");
      instances[1].props.onClick();

      expect(u.json).toMatchInlineSnapshot(`
        <div
          className="game"
        >
          <div
            className="game-board"
          >
            <div>
              <div
                className="board-row"
              >
                <button
                  className="square"
                  data-testid={0}
                  onClick={[Function]}
                />
                <button
                  className="square"
                  data-testid={1}
                  onClick={[Function]}
                >
                  X
                </button>
                <button
                  className="square"
                  data-testid={2}
                  onClick={[Function]}
                />
              </div>
              <div
                className="board-row"
              >
                <button
                  className="square"
                  data-testid={3}
                  onClick={[Function]}
                />
                <button
                  className="square"
                  data-testid={4}
                  onClick={[Function]}
                />
                <button
                  className="square"
                  data-testid={5}
                  onClick={[Function]}
                />
              </div>
              <div
                className="board-row"
              >
                <button
                  className="square"
                  data-testid={6}
                  onClick={[Function]}
                />
                <button
                  className="square"
                  data-testid={7}
                  onClick={[Function]}
                />
                <button
                  className="square"
                  data-testid={8}
                  onClick={[Function]}
                />
              </div>
            </div>
          </div>
          <div
            className="game-info"
          >
            <div>
              Next player: O
            </div>
            <ol>
              <li>
                <button
                  onClick={[Function]}
                >
                  Go to game start
                </button>
              </li>
              <li>
                <button
                  onClick={[Function]}
                >
                  Go to move #1
                </button>
              </li>
            </ol>
          </div>
        </div>
      `);
    });

    it("with Enzyme shallow()", () => {
      // not applicable
    });

    it("with Enzyme mount()", () => {
      const wrapper = mount(testElement);

      const cell = wrapper.find("button");
      cell.at(1).simulate("click");

      expect(wrapper).toMatchInlineSnapshot(`
        <Game>
          <div
            className="game"
          >
            <div
              className="game-board"
            >
              <Board
                onClick={[Function]}
                squares={
                  [
                    null,
                    "X",
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                  ]
                }
              >
                <div>
                  <div
                    className="board-row"
                  >
                    <Square
                      onClick={[Function]}
                      rowCol={0}
                      value={null}
                    >
                      <button
                        className="square"
                        data-testid={0}
                        onClick={[Function]}
                      />
                    </Square>
                    <Square
                      onClick={[Function]}
                      rowCol={1}
                      value="X"
                    >
                      <button
                        className="square"
                        data-testid={1}
                        onClick={[Function]}
                      >
                        X
                      </button>
                    </Square>
                    <Square
                      onClick={[Function]}
                      rowCol={2}
                      value={null}
                    >
                      <button
                        className="square"
                        data-testid={2}
                        onClick={[Function]}
                      />
                    </Square>
                  </div>
                  <div
                    className="board-row"
                  >
                    <Square
                      onClick={[Function]}
                      rowCol={3}
                      value={null}
                    >
                      <button
                        className="square"
                        data-testid={3}
                        onClick={[Function]}
                      />
                    </Square>
                    <Square
                      onClick={[Function]}
                      rowCol={4}
                      value={null}
                    >
                      <button
                        className="square"
                        data-testid={4}
                        onClick={[Function]}
                      />
                    </Square>
                    <Square
                      onClick={[Function]}
                      rowCol={5}
                      value={null}
                    >
                      <button
                        className="square"
                        data-testid={5}
                        onClick={[Function]}
                      />
                    </Square>
                  </div>
                  <div
                    className="board-row"
                  >
                    <Square
                      onClick={[Function]}
                      rowCol={6}
                      value={null}
                    >
                      <button
                        className="square"
                        data-testid={6}
                        onClick={[Function]}
                      />
                    </Square>
                    <Square
                      onClick={[Function]}
                      rowCol={7}
                      value={null}
                    >
                      <button
                        className="square"
                        data-testid={7}
                        onClick={[Function]}
                      />
                    </Square>
                    <Square
                      onClick={[Function]}
                      rowCol={8}
                      value={null}
                    >
                      <button
                        className="square"
                        data-testid={8}
                        onClick={[Function]}
                      />
                    </Square>
                  </div>
                </div>
              </Board>
            </div>
            <div
              className="game-info"
            >
              <div>
                Next player: O
              </div>
              <ol>
                <li
                  key="0"
                >
                  <button
                    onClick={[Function]}
                  >
                    Go to game start
                  </button>
                </li>
                <li
                  key="1"
                >
                  <button
                    onClick={[Function]}
                  >
                    Go to move #1
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </Game>
      `);
    });

    it("with TestingLibrary/react", async () => {
      render(testElement);

      fireEvent.click(await screen.findByTestId("1"));

      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div><div class="game"><div class="game-board"><div><div class="board-row"><button class="square" data-testid="0"></button><button class="square" data-testid="1">X</button><button class="square" data-testid="2"></button></div><div class="board-row"><button class="square" data-testid="3"></button><button class="square" data-testid="4"></button><button class="square" data-testid="5"></button></div><div class="board-row"><button class="square" data-testid="6"></button><button class="square" data-testid="7"></button><button class="square" data-testid="8"></button></div></div></div><div class="game-info"><div>Next player: O</div><ol><li><button>Go to game start</button></li><li><button>Go to move #1</button></li></ol></div></div></div>"`
      );
    });
  });
});
