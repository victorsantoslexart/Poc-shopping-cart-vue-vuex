import { createLocalVue } from "@vue/test-utils";
import { expect } from "chai";
import { describe, it } from "mocha";
import Vuex from "vuex";
import { mutations } from "./store";

const localVue = createLocalVue();
localVue.use(Vuex);

// destructure assign `mutations`
const { increment } = mutations;

describe("mutations", () => {
  it("INCREMENT", () => {
    // mock state
    const state = { count: 0 };
    // apply mutation
    increment(state);
    // assert result
    expect(state.count).to.equal(1);
  });
});
