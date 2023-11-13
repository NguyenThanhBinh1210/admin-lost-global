/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createMessage } from '~/apis/chat.api'
import { AppContext } from '~/contexts/app.context'
import { generateRandomOrderCode } from '~/utils/utils'

const ShowMessage = ({ isOpen, onClose, data }: any) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }
  const [valueInput, setValueInput] = useState<string>('')
  const { profile } = useContext(AppContext)
  // const queryClient = useQueryClient()
  const chatMutation = useMutation({
    mutationFn: (body: any) => {
      return createMessage(body)
    }
  })
  const [contentMessage, setContentMessage] = useState<any>(data?.content)
  useEffect(() => {
    setContentMessage(data?.content)
  }, [data?.content])
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (valueInput !== '') {
      const newData = {
        message: valueInput,
        sender: data?.sender
      }
      const dataState = [
        ...contentMessage,
        {
          _id: generateRandomOrderCode(10),
          userId: profile._id,
          message: valueInput
        }
      ]
      // console.log(newData)
      setContentMessage(dataState)
      setValueInput('')
      chatMutation.mutate(newData)
    }
  }
  const messagesContainerRef = useRef<any | null>(null)

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
  }
  useEffect(() => {
    scrollToBottom()
  }, [contentMessage])
  return (
    <div
      id='authentication-modal'
      tabIndex={-1}
      aria-hidden='true'
      onClick={handleModalClick}
      className={` ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } fixed bg-[#02020246] dark:bg-[#ffffff46] top-0 left-0 right-0 z-50 w-[100vw] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100vh] transition-all`}
    >
      <div
        ref={modalRef}
        className='relative z-100 w-full left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] max-w-md max-h-full'
      >
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <button
            onClick={onClose}
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
            data-modal-hide='authentication-modal'
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Nhắn tin</h3>
            <div className='space-y-6'>
              <div>
                <div
                  ref={messagesContainerRef}
                  className='border rounded-md p-2 min-h-[300px] h-[300px] overflow-x-auto flex items-end'
                >
                  <div className='h-max mt-auto w-full'>
                    {contentMessage?.map((item: any) => (
                      <div
                        key={item._id}
                        className={` p-2 mb-2 rounded-r-xl w-max max-w-[70%] ${
                          item.userId === data.sender ? 'rounded-r-xl bg-gray-100' : 'rounded-l-xl ml-auto bg-blue-100'
                        }  rounded-t-xl`}
                      >
                        {item.message}
                      </div>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className='h-[30px] flex w-full rounded-md border mt-1'>
                  <input
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    className='w-full rounded-l-md border px-3'
                    type='text'
                  />
                  <button className='w-[50px] bg-blue-500 text-white ring-1 ring-blue-500 rounded-r-md'>Gửi</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowMessage
