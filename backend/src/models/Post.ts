import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

postSchema.index({ author: 1, createdAt: -1 });

export default mongoose.model<IPost>('Post', postSchema);