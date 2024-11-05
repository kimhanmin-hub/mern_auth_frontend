'use client'
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { API_URL } from '@/server';
import { setAuthUser } from '@/store/authSlice';

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async () => {
        if(!otp || !email || !password || !passwordConfirm) return;
        setLoading(true);

        try {
            const data ={email,otp,password,passwordConfirm};

            const response = await axios.post(
                `${API_URL}/users/reset-password`,
                data,
                {withCredentials:true}
            );

            dispatch(setAuthUser(response.data.data.user));
            toast.success('비밀번호가 재설정되었습니다.');
            router.push('/auth/login');
        } catch (error:any) {
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className='h-screen flex items-center justify-center flex-col'>
            <input
                type='number'
                placeholder='인증번호 입력'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='block w-[30%] mb-4 rounded-lg bg-gray-300 px-6 py-3
                             no-spinner outline-none'
             
            />
            <input
                type='password'
                placeholder='새로운 비밀번호 입력'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block w-[30%] mx-auto mb-4 rounded-lg bg-gray-300 px-6 py-3
                            mt-4 outline-none' 
            />
            <input
                type='password'
                placeholder='새로운 비밀번호 확인'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className='block w-[30%] mx-auto rounded-lg bg-gray-300 px-6 py-3
                            outline-none'
            />
            <div className='flex items-center space-x-4 mt-6 font-bold'>
                {!loading && (<Button onClick={handleSubmit}>비밀번호 재설정</Button>)}
                {loading && (<Button>
                    <Loader className='animate-spin' />
                </Button>)}
                <Button variant='ghost'>
                    <Link href='/auth/forgetpassword'>뒤로 가기</Link>
                </Button>
            </div>
        </div>
    )
}

export default ResetPassword;