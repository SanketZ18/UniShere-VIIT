package com.unishare.dto.auth;

import com.unishare.dto.UserProfileResponse;
import java.time.Instant;

public record AuthResponse(
        String token,
        Instant expiresAt,
        UserProfileResponse user
) {
}
