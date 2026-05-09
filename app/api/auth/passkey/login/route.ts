export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';

// Passkey login is not implemented. The previous implementation was a mock
// that issued real JWT cookies without verifying the WebAuthn assertion.
// It has been disabled to prevent authentication bypass. Re-enable only after
// wiring up persistent users, credentials, challenges, and a real
// `verifyAuthenticationResponse` call.
export async function POST() {
    return NextResponse.json(
        { error: 'Passkey login is not available' },
        { status: 501 }
    );
}
