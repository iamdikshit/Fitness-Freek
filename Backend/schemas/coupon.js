import {defineField, defineType} from 'sanity'
import {MdPriceChange as icon} from 'react-icons/md'

export default defineType({
  name: 'coupon',
  title: 'Coupon',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      description:
        'SAM50 : first 3 are alphabet for your name or brand and last two digit for discount',
      validation: (Rule) => Rule.required().max(5),
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      description: 'you can give 1 to 90 % discount, 5 means 5% and 50 means 50%',
      validation: (Rule) => Rule.max(90),
    }),
    defineField({
      name: 'expire',
      title: 'Expire',
      type: 'date',
    }),
    // Active or not
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'code'},
  },
})
