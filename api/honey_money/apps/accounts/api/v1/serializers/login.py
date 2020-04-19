from rest_framework import serializers


class JWTLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True, max_length=254)
    password = serializers.CharField(max_length=128, style={"input_type": "password"}, write_only=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
