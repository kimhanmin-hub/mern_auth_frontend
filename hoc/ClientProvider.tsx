"use client"; // Next.js에서 클라이언트 컴포넌트임을 명시

// Redux store와 persist 관련 기능들을 import
import store from '@/store/store';
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'; // Redux store를 앱에 제공하는 컴포넌트
import { PersistGate } from 'redux-persist/integration/react'; // 영구 저장소에서 상태를 복원할 때까지 앱 렌더링을 지연
import { persistStore } from 'redux-persist'; // Redux store를 영구 저장소에 저장하는 기능

// store의 영구 저장소 인스턴스 생성
const persistor = persistStore(store);

// children: 이 컴포넌트로 감싸진 모든 하위 컴포넌트들
interface ClientProviderProps {
    children: React.ReactNode;
}

const ClientProvider = ({children}: ClientProviderProps) => {
  return (
    <Provider store={store}>  {/* Redux store를 앱 전체에 제공 */}
        <PersistGate loading={null} persistor={persistor}>  {/* 저장된 상태가 복원될 때까지 렌더링 지연 */}
            {children}  {/* 감싸진 모든 하위 컴포넌트들이 여기서 렌더링 됨 */}
        </PersistGate>
    </Provider>
  )
}

export default ClientProvider;