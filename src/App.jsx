import Layout from "./components/Layout/Layout";
import {
  About,
  AuthRequired,
  Dashboard,
  Home,
  HostLayout,
  HostEventDetail,
  HostEventLayout,
  HostEventParticipants,
  HostEventPricing,
  HostEventPhotos,
  HostEvents,
  Login,
  NotFound,
  Income,
  Reviews,
  EventDetail,
  Events,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetail />} />

            <Route element={<AuthRequired />}>
              <Route path="host" element={<HostLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="events" element={<HostEvents />} />
                <Route path="events/:id" element={<HostEventLayout />}>
                  <Route index element={<HostEventDetail />} />
                  <Route
                    path="participants"
                    element={<HostEventParticipants />}
                  />
                  <Route path="pricing" element={<HostEventPricing />} />
                  <Route path="photos" element={<HostEventPhotos />} />
                </Route>
                <Route
                  path="subscriptions"
                  element={<HostEvents isSubscription={true} />}
                />
                <Route
                  path="subscriptions/:id"
                  element={<EventDetail isSubscription={true} />}
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
