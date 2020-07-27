import * as BlogModel from '../model/blog.model';

const BlogRepository = new (class BlogRepository {
  constructor() {
    this.model = BlogModel;
  }
  async index() {
    try {
      return this.model.find({});
    } catch (e) {}
  }

  async show(id) {
    try {
      return this.model.findOne({ _id: id });
    } catch (e) {}
  }

  async insert(data) {
    try {
      return this.model.create(data);
    } catch (e) {}
  }

  async update(find, update) {
    try {
      return this.model.find(find, update);
    } catch (e) {}
  }

  async destroy(find) {
    try {
      return this.model.findOneAndUpdate(find, {
        deletedAt: { date: Date.now() },
      });
    } catch (e) {}
  }
})();

export default BlogRepository;
