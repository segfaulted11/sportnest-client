import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Loading from "../components/shared/Loading";

export default function PrivateRoute({
    children,
}) {

    const session = useAuth();

    const location = useLocation();

    if (session.isPending)
        return <Loading />;

    if (!session.data?.user)

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );

    return children;
}