Here's a code example for a paginated archive view of past challenges with completion status indicators:

```python
from django.core.paginator import Paginator
from django.shortcuts import render
from .models import Challenge

def challenge_archive(request):
    challenges = Challenge.objects.filter(is_published=True).order_by('-date_created')
    
    paginator = Paginator(challenges, 10)  # Show 10 challenges per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'challenges/archive.html', {
        'page_obj': page_obj,
    })
```

```html
<!-- challenges/archive.html -->
{% extends 'base.html' %}

{% block content %}
<div class="challenge-archive">
    <h1>Past Challenges</h1>
    
    <ul class="challenge-list">
        {% for challenge in page_obj %}
        <li class="challenge-item {% if challenge.completed %}completed{% else %}incomplete{% endif %}">
            <h2>{{ challenge.title }}</h2>
            <p class="date">{{ challenge.date_created|date:"F j, Y" }}</p>
            <div class="status-indicator">
                {% if challenge.completed %}
                    <span class="completed">✓ Completed</span>
                {% else %}
                    <span class="incomplete">✗ Incomplete</span>
                {% endif %}
            </div>
            <a href="{% url 'challenge_detail' challenge.id %}" class="view-link">View Details</a>
        </li>
        {% endfor %}
    </ul>
    
    <div class="pagination">
        <span class="step-links">
            {% if page_obj.has_previous %}
                <a href="?page=1">&laquo; first</a>
                <a href="?page={{ page_obj.previous_page_number }}">previous</a>
            {% endif %}
            
            <span class="current">
                Page {{ page_obj.number }} of {{ page_obj.paginator.num_pages }}.
            </span>
            
            {% if page_obj.has_next %}
                <a href="?page={{ page_obj.next_page_number }}">next</a>
                <a href="?page={{ page_obj.paginator.num_pages }}">last &raquo;</a>
            {% endif %}
        </span>
    </div>
</div>
{% endblock %}
```

```css
/* Optional CSS for styling */
.challenge-archive {
    max-width: 800px;
    margin: 0 auto;
}

.challenge-list {
    list-style: none;
    padding: 0;
}

.challenge-item {
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    background: #f8f9fa;
    position: relative;
}

.challenge-item.completed {
    border-left: 5px solid #28a745;
}

.challenge-item.incomplete {
    border-left: 5px solid #dc3545;
}

.status-indicator {
    margin: 0.5rem 0;
}

.status-indicator .completed {
    color: #28a745;
    font-weight: bold;
}

.status-indicator .incomplete {
    color: #dc3545;
    font-weight: bold;
}

.date {
    color: #6c757d;
    font-size: 0.9rem;
}

.pagination {
    margin-top: 2rem;
    text-align: center;
}

.pagination a {
    margin: 0 0.5rem;
}
```

This implementation includes:
1. Django view with pagination
2. Template with challenge list and status indicators
3. Basic CSS styling for visual feedback
4. Pagination controls at the bottom
5. Visual distinction between completed and incomplete challenges