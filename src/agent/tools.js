import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import { products } from './data.js';

export const searchProductTool = tool(
    ({ value }) => {
        const searchValue = value.toLowerCase();

        const results = products.filter((item) => {
            return item.keywords.some((keyword) => keyword.toLocaleLowerCase().includes(searchValue))
        })

        if (results.length === 0) {
            return "NO products found."
        }

        return JSON.stringify(results)
    },
    {
        name: 'search_product',
        description: `search product by exactly one field: 
    product name , category or brand . 
    use value for that field , never use the customer's full sentence.
    `,
        schema: z.object({
            value: z.string().describe('only the name , category or brand')
        })
    }
)



export const checkProductStockTool = tool(
    ({ value }) => {
       return "No Stock Available"
    },
    {
        name: 'check_product_stock',
        description: `check stock of products
    `,
        schema: z.object({
            value: z.string().describe('product name')
        })
    }
)