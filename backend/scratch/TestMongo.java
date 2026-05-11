
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class TestMongo {
    public static void main(String[] args) {
        String uri = "mongodb+srv://UniShare:UniShare@unishare.1ufmqth.mongodb.net/unishare?appName=UniShare";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("unishare");
            Document command = new Document("ping", 1);
            Document res = database.runCommand(command);
            System.out.println("Ping successful: " + res.toJson());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
