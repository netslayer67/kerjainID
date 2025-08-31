import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

import AppLayout from '@/components/Layout/AppLayout';
import PageLoader from '@/components/PageLoader';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const VerificationPage = lazy(() => import('@/pages/VerificationPage'));
const RoleSelectionPage = lazy(() => import('@/pages/RoleSelectionPage'));
const ClientDashboard = lazy(() => import('@/pages/ClientDashboard'));
const WorkerDashboard = lazy(() => import('@/pages/WorkerDashboard'));
const PostJobPage = lazy(() => import('@/pages/PostJobPage'));
const JobTrackingPage = lazy(() => import('@/pages/JobTrackingPage'));
const ChatPage = lazy(() => import('@/pages/ChatPage'));
const WalletPage = lazy(() => import('@/pages/WalletPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const RatingPage = lazy(() => import('@/pages/RatingPage'));
const DisputePage = lazy(() => import('@/pages/DisputePage'));
const HelpCenterPage = lazy(() => import('@/pages/HelpCenterPage'));
const ReferralPage = lazy(() => import('@/pages/ReferralPage'));
const GamificationPage = lazy(() => import('@/pages/GamificationPage'));
const NotificationPage = lazy(() => import('@/pages/NotificationPage'));

function App() {
    const location = useLocation();

    return (
        <>
            <Helmet>
                <title>Kerjain - Dapatkan Bantuan, Tawarkan Jasa</title>
                <meta name="description" content="Kerjain adalah platform auto-matching untuk pekerjaan mikro hingga proyek makro. Temukan bantuan instan atau tawarkan keahlian Anda." />
                <meta property="og:title" content="Kerjain - Dapatkan Bantuan, Tawarkan Jasa" />
                <meta property="og:description" content="Platform auto-matching untuk semua jenis pekerjaan." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Helmet>
            <AnimatePresence mode="wait">
                <Suspense fallback={<PageLoader />}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/verify" element={<VerificationPage />} />
                        <Route path="/select-role" element={<RoleSelectionPage />} />

                        <Route element={<AppLayout />}>
                            <Route path="/client/dashboard" element={<ClientDashboard />} />
                            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
                            <Route path="/post-job" element={<PostJobPage />} />
                            <Route path="/job/:id/track" element={<JobTrackingPage />} />
                            <Route path="/chat" element={<ChatPage />} />
                            <Route path="/wallet" element={<WalletPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/job/:id/rate" element={<RatingPage />} />
                            <Route path="/dispute" element={<DisputePage />} />
                            <Route path="/help" element={<HelpCenterPage />} />
                            <Route path="/referral" element={<ReferralPage />} />
                            <Route path="/gamification" element={<GamificationPage />} />
                            <Route path="/notifications" element={<NotificationPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </AnimatePresence>
        </>
    );
}

export default App;