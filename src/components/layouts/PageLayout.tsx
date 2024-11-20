import React from 'react'
import grid from '@/assets/1548260.svg'
import { Button, Paper, useBreakpoint } from 'nebula-ds-react-library'
import { useRouter } from '@/infrastructure/router/router'

interface Props {
  children: React.ReactNode
}

export const PageLayout = (props: Props) => {
  const { isMobile } = useBreakpoint()
  const router = useRouter()

  return (
    <>
      <img className={'fixed inset-x-0 bottom-0 z-0'} src={grid} alt="bg" />

      <div className="container z-10 mx-auto flex h-full max-w-7xl flex-1 flex-col items-stretch px-2 pb-2 sm:px-0 md:pb-6">
        {/*header*/}
        <div className="flex flex-wrap items-center justify-between pb-2 sm:pb-0">
          {/*title*/}
          <h1 className="header1">Dashboard</h1>

          {/*actions*/}
          <div className={'flex items-center justify-end gap-4'}>
            <Button
              size={isMobile ? 'S' : 'M'}
              className="w-fit"
              onClick={() => router.navigate('/login')}
              variant={'outlined'}
            >
              Go to Login
            </Button>
            <Button size={isMobile ? 'S' : 'M'} rounded="R">
              Tell to a friend
            </Button>
          </div>
        </div>

        {/*main*/}
        <Paper
          className="flex !flex-1"
          panelClassName="!flex !flex-col !flex-1 !items-center !justify-center border !rounded-t-none !border-t-0"
          outline="200"
          round="lg"
        >
          {props.children}
        </Paper>
      </div>
    </>
  )
}
