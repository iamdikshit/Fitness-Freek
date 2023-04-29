import {defineField, defineType} from 'sanity'
import {MdAddShoppingCart as icon} from 'react-icons/md'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
    }),
    // Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 200, // will be ignored if slugify is set
      },

      description: 'Product handle',
    }),

    defineType({
      name: 'price',
      title: 'Price',
      type: 'object',
      options: {
        columns: 2,
      },
      fields: [
        defineField({name: 'price', title: 'Price', type: 'string'}),
        defineField({name: 'markedprice', title: 'Marked Price', type: 'string'}),
      ],
    }),

    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    }),

    defineField({
      title: 'Poster',
      name: 'poster',
      type: 'image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    }),
    defineField({
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true, // <-- Defaults to false
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description for product',
    }),

    defineField({
      name: 'specification',
      title: 'Specification',
      type: 'array',
      description: 'Mention specification of the product',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `Some of your visitors cannot see images, 
            be they blind, color-blind, low-sighted; 
            alternative text is of great help for those 
            people that can rely on it to have a good idea of 
            what\'s on your page.`,
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
    }),

    defineField({
      title: 'Variants',
      name: 'variants',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'weight',
              title: 'Weight',
              type: 'object',
              options: {
                columns: 2,
              },
              fields: [
                defineField({name: 'weight', title: 'Weight', type: 'string'}),
                defineField({
                  name: 'unit',
                  title: 'Unit',
                  type: 'string',
                  options: {
                    layout: 'dropdown',
                    list: ['gm', 'lbs', 'kg', 'pounds'],
                  },
                }),
              ],
            },
            {
              name: 'flavor',
              title: 'Flavor',
              type: 'string',
            },
            {
              name: 'qty',
              title: 'Qty',
              type: 'number',
            },

            {
              name: 'price',
              title: 'Price',
              type: 'string',
            },
            // Available
            {
              name: 'isAvailable',
              title: 'Available',
              type: 'boolean',
            },
            defineField({
              name: 'previewImageUrl',
              title: 'Preview Image URL',
              type: 'string',
              description: 'Image displayed in both cart and checkout',
            }),
          ],
        },
      ],
    }),

    // Categories

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: ['protein', 'preworkout', 'postworkout', 'other'],
      },
    }),

    // Coupon
    defineField({
      name: 'coupon',
      title: 'Coupon',
      type: 'reference',
      to: {type: 'coupon'},
      description: 'Coupon ID',
    }),

    // Tags
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    }),
    // Deleted
    defineField({
      name: 'published',
      title: 'Product is Published or not',
      type: 'boolean',
    }),
  ],
})
