import {createLocalVue} from "@vue/test-utils";
import {ValidationObserver, ValidationProvider} from "vee-validate";

export function localValidate() {
  let localVue = createLocalVue()
  localVue.component('ValidationObserver', ValidationObserver)
  localVue.component('ValidationProvider', ValidationProvider)

  return localVue
}
