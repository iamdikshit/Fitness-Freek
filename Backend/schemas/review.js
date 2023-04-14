import {defineField, defineType} from 'sanity'
import {MdReviews as icon} from 'react-icons/md'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: {type: 'user'},
    }),

    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: {type: 'product'},
      description: 'Product ID',
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    defineField({
      name: 'review',
      title: 'Review',
      type: 'text',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'string',
    }),
  ],
  //   preview: {
  //     select: {title: 'user.email'},
  //   },

  preview: {
    select: {
      title: 'product.name',
      user: 'user.name',
    },
    prepare(selection) {
      const {title, user} = selection
      return {
        title: title,
        subtitle: `Reviewed by: ${user ? user : 'unknown'}`,
      }
    },
  },
})
