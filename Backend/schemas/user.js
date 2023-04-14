import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'token',
      title: 'Token',
      type: 'string',
      description: 'Access token',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'name'},
  },
})
