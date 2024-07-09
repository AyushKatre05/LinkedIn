import { Info } from 'lucide-react'
import React from 'react'

const newsItems = [
  {
    heading: "India win 2024 T20 world cup",
    subHeading: "1h ago - 524 readers"
  },
  {
    heading: "Deforestation is still Increasing",
    subHeading: "4h ago - 239 readers"
  },
  {
    heading: "Rise in price of gold by 2%",
    subHeading: "4h ago - 234 readers"
  },
  {
    heading: "Maharashtra's Rainfall goes beyond the limit",
    subHeading: "4h ago - 112 readers"
  },
]

const News = () => {
  return (
    <div className='hidden md:block w-full bg-white h-fit rounded-lg border border-gray-300'>
      <div className='flex items-center justify-between p-3'>
        <h1 className='font-medium'>LinkedIn News</h1>
        <Info size={18} />
      </div>
      <div className='grid grid-cols-1 gap-4 p-3'>
        {newsItems.map((item, index) => (
          <div key={index} className='hover:bg-gray-200 cursor-pointer p-2 rounded'>
            <h1 className='text-sm font-medium'>{item.heading}</h1>
            <p className='text-xs text-gray-600'>{item.subHeading}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default News
