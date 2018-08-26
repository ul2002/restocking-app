
import {ref, withParams} from 'vuelidate/lib/validators/common'
export default equalTo => withParams(
  {type: 'notEqual', eq: equalTo},
  function (value, parentVm) {
    return value !== ref(equalTo, this, parentVm)
  }
)