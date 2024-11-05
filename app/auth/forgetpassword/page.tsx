'use client'
import { Button } from '@/components/ui/button';
import { API_URL } from '@/server';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/users/forget-password`,
                { email },
                { withCredentials: true }
            );
            toast.success('이메일을 확인해주세요.');
            router.push(`/auth/resetpassword?email=${encodeURIComponent(email)}`);
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center flex-col'>
            <h1 className='text-x1 text-gray-900 mb-4 font-bold'>
                비밀번호를 재설정하기 위해 이메일을 입력해주세요.
            </h1>
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='blcok w-[40%] mb-4 mx-auto rounded-lg bg-gray-300 px-4 py-3' />
            {!loading && (<Button onClick={handleSubmit}>이메일 전송</Button>)}
            {loading &&
                <Button>
                    <Loader className='animate-spin' />
                </Button>}
        </div>

    )
}

export default ForgetPassword;