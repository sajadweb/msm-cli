const useContext = ({ SERVICE_DIR, service, name }) => {
  return `import mongoose, { Schema } from 'mongoose';
const ${name}Schema = new Schema({
  deletedAt:{  date: {type:Date} , actor:{ type: Schema.Types.ObjectId , ref:'contact'}   },
  createdAt: { type: Date , default: Date.now() },
  updatedAt: { type: Date },
});

const ${name}Model = mongoose.model('${name.c2snake()}', ${name}Schema);
export default ${name}Model;
`;
};
const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
  storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/model`);
  await storeg.write(
    `${SERVICE_DIR}/${micro}/model/${name}.model.js`,
    useContext({ SERVICE_DIR, service: micro, name }),
    true
  );
};
module.exports = {
  useContext,
  setContext,
};
