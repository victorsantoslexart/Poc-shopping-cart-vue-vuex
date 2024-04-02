import { createLocalVue } from "@vue/test-utils";
// const { expect } = require("chai");
// const { mutations } = require("./mutations");
// const { describe, it } = require("mocha");
import { expect } from "chai";
import { describe, it } from "mocha";
import Vuex from "vuex";
import { mutations } from "./index";

const localVue = createLocalVue();
localVue.use(Vuex);

const { setProducts } = mutations;

describe("mutations", () => {
  it("setProducts", () => {
    const state = { products: 0 };
    setProducts(state);
    expect(state.products).to.equal(0);
  });
});
