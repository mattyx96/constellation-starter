import React from 'react'
import grid from '@/assets/1548260.svg'
import { Button } from '../atoms/Button'

interface Props {
  children: React.ReactNode
}

export const PageLayout = (props: Props) => {
  return (
    <>
      <img className={'absolute inset-x-0 bottom-0 -z-10'} src={grid} />
      {/*<div className='w-screen h-20 bg-black absolute top-0 right-0 left-0 z-0'></div>*/}
      <div className="z-10 flex h-screen w-screen flex-col items-center justify-center sm:pb-5">
        {/*header*/}
        <div className="container mx-auto flex h-24 items-center justify-between">
          {/*title*/}
          <h1 className="font-orbitron text-5xl font-semibold">Dashboard</h1>

          {/*actions*/}
          <div className={'flex items-center justify-end gap-2'}>
            <Button variant={'cta2'}> Delete </Button>
            <Button variant={'cta2'}> Edit </Button>
            <Button variant={'cta'}> Save </Button>
          </div>
        </div>

        {/*main*/}
        <div className="container mx-auto flex h-full items-center justify-center rounded-b-3xl border border-black bg-white">
          {props.children}
        </div>
      </div>
    </>
  )
}
