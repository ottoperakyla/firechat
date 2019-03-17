import { shallowMount } from "@vue/test-utils";
import NameForm from "@/components/NameForm.vue";

describe("NameForm.vue", () => {
  it("renders form correctly", () => {
    const wrapper = shallowMount(NameForm);

    expect(wrapper.find("form label").text()).toMatch("Enter your name");
    expect(wrapper.find("form").contains('input[type="text"]')).toBeTruthy();
    expect(wrapper.find("form button").text()).toMatch("Submit");
  });
});
