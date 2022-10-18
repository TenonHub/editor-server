const mongoose = require('../db/mongoose')

const WorkSchema = mongoose.Schema(
    {
        title: String,
        components: [Object],
        props: Object,
        setting: Object,
    },
    {
        timestamps: true,
    }
)

const WorkModel = mongoose.model('work', WorkSchema)

module.exports = {
    WorkModel,
}
