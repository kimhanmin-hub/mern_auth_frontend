'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react'
import axios from 'axios';
import { API_URL } from '@/server';
import { Loader } from 'lucide-react';

import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/store/authSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const Signup = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    //로딩 상태 관리
    const [loading, setLoading] = useState(false);
    //회원 가입 폼 초기 상태 설정
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    })

    //회원 가입 폼 상태 변경 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    //회원 가입 요청 함수
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('회원가입 시도...');
            const response = await axios.post(`${API_URL}/users/signup`, formData, {
                withCredentials: true,
            });

            console.log('회원가입 응답:', response.data);
            const user = response.data.data.user;
            
            if (user) {
                console.log('사용자 데이터:', user);
                toast.success('회원가입이 완료되었습니다.');
                dispatch(setAuthUser(user));
                
                // 라우팅 전에 상태 확인
                console.log('verify 페이지로 이동 시도...');
                await router.push('/auth/verify');
                console.log('라우팅 완료');
            }
        } catch (error: any) {
            console.error('회원가입 에러:', error);
            toast.error(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='shadow-md rounded-lg w-[80%] sm:w-[350px] md:w-[350px] lg:w-[450px] p-8 bg-white'>
                <h1 className='text-center font-bold text-3xl mb-4 mt-4'>ONETTUS</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="username" className='blcok mb-2 text-sm font-bold'>
                            아이디
                        </label>
                        <input
                            type='text'
                            name='username'
                            placeholder='사용하실 아이디를 입력해주세요'
                            value={formData.username}
                            onChange={handleChange}
                            className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="email" className='blcok mb-2 text-sm font-bold'>
                            이메일
                        </label>
                        <input
                            type='email'
                            name='email'
                            placeholder='이메일을 입력해주세요'
                            value={formData.email}
                            onChange={handleChange}
                            className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="password" className='blcok mb-2 text-sm font-bold'>
                            비밀번호
                        </label>
                        <input
                            type='password'
                            name='password'
                            placeholder='비밀번호를 입력해주세요'
                            value={formData.password}
                            onChange={handleChange}
                            className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="passwordConfirm" className='blcok mb-2 text-sm font-bold'>
                            비밀번호 확인
                        </label>
                        <input
                            type='password'
                            name='passwordConfirm'
                            placeholder='비밀번호를 한번 더 입력해주세요'
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            className='px-4 py-2 bg-gray-200 rounded-md outline-none w-full' />
                    </div>
                    {!loading && (<Button type='submit' className='w-full mt-6' size={'lg'}>
                        가입하기
                    </Button>)}
                    {loading && (<Button className='w-full mt-6' size={'lg'}>
                        <Loader className='animate-spin' />
                    </Button>)}
                </form>
                <h1 className='mt-6 text-center'>
                    이미 계정이 있으신가요?
                    <Link href={'/auth/login'}>
                        <span className='text-blue-600 cursor-pointer'>로그인</span></Link></h1>
            </div>
        </div>
    )
}

export default Signup;