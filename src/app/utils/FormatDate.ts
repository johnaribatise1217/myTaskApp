const moment = require("moment/moment")

const FormateDate = (date : any) => {
  return moment(date).format("DD/MM/YYYY")
}

export default FormateDate