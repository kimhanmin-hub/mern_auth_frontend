"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { API_URL } from '@/server';
import { setAuthUser } from '@/store/authSlice';
import { toast } from 'sonner';

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.User);
  const dispatch = useDispatch();

  
  const logoutHandler = async () => {
    await axios.post(`${API_URL}/users/logout`);
    dispatch(setAuthUser(null));
    toast.success('로그아웃 되었습니다.');
  }

  return (
    <div className='h-[12vh] shadow-md'>
      <div className='
       w-[80%] mx-auto flex
       items-center 
       justify-between
       h-full'>
        <h1 className='text-3xl font-bold uppercase'>Onettus</h1>
        {!user && <Link href={'/auth/signup'}>
          <Button size={'lg'}>회원가입</Button>
        </Link>}

        {user && <div className= 'flex items-center space-x-2'>
          <Avatar onClick={logoutHandler} className='cursor-pointer'>
            <AvatarFallback className='font-bold uppercase'>
              {user.username.split('')[0]}
            </AvatarFallback>
          </Avatar>
          <Button>게시판</Button>
          <Button variant={'ghost'} size={'sm'}>
            {user.isVerified ? '로그인 완료' : '로그인이 필요합니다'}
            </Button>
          </div>}
      </div>
      <h1 className='flex items-center justify-center h-[88vh] text-5xl font-bold'>
        Homepage
        </h1>
    </div>
  )
}

export default HomePage;