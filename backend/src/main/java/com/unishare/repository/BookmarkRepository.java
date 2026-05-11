package com.unishare.repository;

import com.unishare.model.Bookmark;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookmarkRepository extends MongoRepository<Bookmark, String> {

    Optional<Bookmark> findByUserAccountIdAndResourceId(String userAccountId, String resourceId);

    List<Bookmark> findByUserAccountId(String userAccountId);
}
