
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
	load as loadIntercom,
	boot as bootIntercom,
	update as updateIntercom,
} from "./intercom";
import { useSession } from "next-auth/react";

type IntercomProviderProps = {
	children: React.ReactNode;
};

export const IntercomProvider = ({ children }: IntercomProviderProps) => {
	const router = useRouter();
	const { data: session } = useSession();

	useEffect(() => {
		if (typeof window !== "undefined") {
			loadIntercom();
			bootIntercom({}, session?.user);
		}
	}, [session]);

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			if (typeof window !== "undefined") {
				updateIntercom();
			}
		};

		router.events.on("routeChangeStart", handleRouteChange);
		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [router.events]);

	return children;
};

